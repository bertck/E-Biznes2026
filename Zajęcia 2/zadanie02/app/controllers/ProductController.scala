package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import repositories.ProductRepository

@Singleton
class ProductController @Inject() (
    val controllerComponents: ControllerComponents,
    repository: ProductRepository
) extends BaseController {

  // GET /products
  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(repository.getAll))
  }

  // GET /products/:id
  def getById(id: Long): Action[AnyContent] = Action {
    repository.getById(id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None          =>
        NotFound(Json.obj("error" -> s"Produkt o id=$id nie istnieje"))
    }
  }

  // POST /products
  def create: Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").asOpt[String]
    val price = (request.body \ "price").asOpt[Double]
    val quantity = (request.body \ "quantity").asOpt[Int]

    (name, price, quantity) match {
      case (Some(n), Some(p), Some(q)) =>
        val created = repository.add(n, p, q)
        Created(Json.toJson(created))
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: name, price, quantity"))
    }
  }

  // PUT /products/:id
  def update(id: Long): Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").asOpt[String]
    val price = (request.body \ "price").asOpt[Double]
    val quantity = (request.body \ "quantity").asOpt[Int]

    (name, price, quantity) match {
      case (Some(n), Some(p), Some(q)) =>
        repository.update(id, n, p, q) match {
          case Some(updated) => Ok(Json.toJson(updated))
          case None          =>
            NotFound(Json.obj("error" -> s"Produkt o id=$id nie istnieje"))
        }
      case _ =>
        BadRequest(Json.obj("error" -> "Wymagane pola: name, price, quantity"))
    }
  }

  // DELETE /products/:id
  def delete(id: Long): Action[AnyContent] = Action {
    if (repository.delete(id)) NoContent
    else NotFound(Json.obj("error" -> s"Produkt o id=$id nie istnieje"))
  }
}
