package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import repositories.CartRepository

@Singleton
class CartController @Inject() (
    val controllerComponents: ControllerComponents,
    repository: CartRepository
) extends BaseController {

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(repository.getAll))
  }

  def getById(id: Long): Action[AnyContent] = Action {
    repository.getById(id) match {
      case Some(item) => Ok(Json.toJson(item))
      case None       =>
        NotFound(Json.obj("error" -> s"Pozycja koszyka o id=$id nie istnieje"))
    }
  }

  def create: Action[JsValue] = Action(parse.json) { request =>
    val productName = (request.body \ "productName").asOpt[String]
    val quantity = (request.body \ "quantity").asOpt[Int]

    (productName, quantity) match {
      case (Some(p), Some(q)) =>
        val created = repository.add(p, q)
        Created(Json.toJson(created))
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: productName, quantity"))
    }
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { request =>
    val productName = (request.body \ "productName").asOpt[String]
    val quantity = (request.body \ "quantity").asOpt[Int]

    (productName, quantity) match {
      case (Some(p), Some(q)) =>
        repository.update(id, p, q) match {
          case Some(updated) => Ok(Json.toJson(updated))
          case None          =>
            NotFound(
              Json.obj("error" -> s"Pozycja koszyka o id=$id nie istnieje")
            )
        }
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: productName, quantity"))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action {
    if (repository.delete(id)) NoContent
    else NotFound(Json.obj("error" -> s"Pozycja koszyka o id=$id nie istnieje"))
  }
}
