package repositories

import javax.inject._
import java.util.concurrent.atomic.AtomicLong
import scala.collection.mutable
import models.Product

@Singleton
class ProductRepository {

  private val idGenerator = new AtomicLong(1L)

  private val products: mutable.ListBuffer[Product] = mutable.ListBuffer(
    Product(idGenerator.getAndIncrement(), "Laptop", 3500.0, 5),
    Product(idGenerator.getAndIncrement(), "Mysz", 50.0, 20),
    Product(idGenerator.getAndIncrement(), "Klawiatura", 150.0, 15)
  )

  def getAll: List[Product] = synchronized(products.toList)

  def getById(id: Long): Option[Product] =
    synchronized(products.find(_.id == id))

  def add(name: String, price: Double, quantity: Int): Product = synchronized {
    val product = Product(idGenerator.getAndIncrement(), name, price, quantity)
    products += product
    product
  }

  def update(
      id: Long,
      name: String,
      price: Double,
      quantity: Int
  ): Option[Product] = synchronized {
    getById(id).map { existing =>
      val updated =
        existing.copy(name = name, price = price, quantity = quantity)
      val index = products.indexWhere(_.id == id)
      products.update(index, updated)
      updated
    }
  }

  def delete(id: Long): Boolean = synchronized {
    val existed = products.exists(_.id == id)
    products --= products.filter(_.id == id)
    existed
  }
}
