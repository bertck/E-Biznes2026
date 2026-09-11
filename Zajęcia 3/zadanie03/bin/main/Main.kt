import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class DiscordMessage(val content: String)

suspend fun sendToDiscord(client: HttpClient, webhookUrl: String, text: String) {
    client.post(webhookUrl) {
        contentType(ContentType.Application.Json)
        setBody(DiscordMessage(content = text))
    }
}

fun main() = kotlinx.coroutines.runBlocking {
    val webhookUrl = System.getenv("DISCORD_WEBHOOK_URL")
        ?: error("Brak zmiennej środowiskowej DISCORD_WEBHOOK_URL")

    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    sendToDiscord(client, webhookUrl, "Aplikacja działa i wysyła wiadomości na Discorda")

    println("Wiadomość wysłana.")
    client.close()
}