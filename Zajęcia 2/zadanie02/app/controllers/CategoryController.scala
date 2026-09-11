package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import repositories.CategoryRepository

@Singleton
class CategoryController @Inject() (
    val controllerComponents: ControllerComponents,
    repository: CategoryRepository
) extends BaseController {

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(repository.getAll))
  }

  def getById(id: Long): Action[AnyContent] = Action {
    repository.getById(id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None           =>
        NotFound(Json.obj("error" -> s"Kategoria o id=$id nie istnieje"))
    }
  }

  def create: Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").asOpt[String]
    val description = (request.body \ "description").asOpt[String]

    (name, description) match {
      case (Some(n), Some(d)) =>
        val created = repository.add(n, d)
        Created(Json.toJson(created))
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: name, description"))
    }
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").asOpt[String]
    val description = (request.body \ "description").asOpt[String]

    (name, description) match {
      case (Some(n), Some(d)) =>
        repository.update(id, n, d) match {
          case Some(updated) => Ok(Json.toJson(updated))
          case None          =>
            NotFound(Json.obj("error" -> s"Kategoria o id=$id nie istnieje"))
        }
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: name, description"))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action {
    if (repository.delete(id)) NoContent
    else NotFound(Json.obj("error" -> s"Kategoria o id=$id nie istnieje"))
  }
}
