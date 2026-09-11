package models

import play.api.libs.json._

case class CartItem(
    id: Long,
    productName: String,
    quantity: Int
)

object CartItem {
  implicit val format: OFormat[CartItem] = Json.format[CartItem]
}
