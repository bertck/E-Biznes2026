import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

@Serializable
data class DiscordMessage(val content: String)

suspend fun sendToDiscord(client: HttpClient, webhookUrl: String, text: String) {
    client.post(webhookUrl) {
        contentType(ContentType.Application.Json)
        setBody(DiscordMessage(content = text))
    }
}

suspend fun runDiscordBot(client: HttpClient, token: String) {
    client.webSocket("wss://gateway.discord.gg/?v=10&encoding=json") {
        var heartbeatJob: Job? = null

        for (frame in incoming) {
            if (frame !is Frame.Text) continue
            val json = Json.parseToJsonElement(frame.readText()).jsonObject
            val op = json["op"]?.jsonPrimitive?.int

            when (op) {
                10 -> {
                    val interval = json["d"]!!.jsonObject["heartbeat_interval"]!!.jsonPrimitive.long
                    heartbeatJob = launch {
                        while (isActive) {
                            delay(interval)
                            send(Frame.Text("""{"op":1,"d":null}"""))
                        }
                    }

                    val identify = buildJsonObject {
                        put("op", 2)
                        putJsonObject("d") {
                            put("token", token)
                            put("intents", 33281)
                            putJsonObject("properties") {
                                put("os", "linux")
                                put("browser", "ktor-bot")
                                put("device", "ktor-bot")
                            }
                        }
                    }
                    send(Frame.Text(identify.toString()))
                }

                0 -> {
                    when (json["t"]?.jsonPrimitive?.content) {
                        "READY" -> println("Bot połączony i gotowy do odbierania wiadomości.")
                        "MESSAGE_CREATE" -> {
                            val d = json["d"]!!.jsonObject
                            val author = d["author"]!!.jsonObject["username"]!!.jsonPrimitive.content
                            val isBot = d["author"]!!.jsonObject["bot"]?.jsonPrimitive?.booleanOrNull ?: false
                            val content = d["content"]!!.jsonPrimitive.content

                            if (!isBot) {
                                println("Odebrano wiadomość od $author: $content")
                            }
                        }
                    }
                }
            }
        }
        heartbeatJob?.cancel()
    }
}

fun main() = runBlocking {
    val webhookUrl = System.getenv("DISCORD_WEBHOOK_URL")
        ?: error("Brak zmiennej środowiskowej DISCORD_WEBHOOK_URL")
    val botToken = System.getenv("DISCORD_BOT_TOKEN")
        ?: error("Brak zmiennej środowiskowej DISCORD_BOT_TOKEN")

    val client = HttpClient(CIO) {
        install(WebSockets)
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    sendToDiscord(client, webhookUrl, "Bot uruchomiony i nasłuchuje wiadomości.")

    runDiscordBot(client, botToken)

    client.close()
}