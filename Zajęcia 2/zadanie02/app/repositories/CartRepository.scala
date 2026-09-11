package repositories

import javax.inject._
import java.util.concurrent.atomic.AtomicLong
import scala.collection.mutable
import models.CartItem

@Singleton
class CartRepository {

  private val idGenerator = new AtomicLong(1L)

  private val items: mutable.ListBuffer[CartItem] = mutable.ListBuffer(
    CartItem(idGenerator.getAndIncrement(), "Laptop", 1),
    CartItem(idGenerator.getAndIncrement(), "Mysz", 2)
  )

  def getAll: List[CartItem] = synchronized(items.toList)

  def getById(id: Long): Option[CartItem] =
    synchronized(items.find(_.id == id))

  def add(productName: String, quantity: Int): CartItem = synchronized {
    val item = CartItem(idGenerator.getAndIncrement(), productName, quantity)
    items += item
    item
  }

  def update(id: Long, productName: String, quantity: Int): Option[CartItem] =
    synchronized {
      getById(id).map { existing =>
        val updated =
          existing.copy(productName = productName, quantity = quantity)
        val index = items.indexWhere(_.id == id)
        items.update(index, updated)
        updated
      }
    }

  def delete(id: Long): Boolean = synchronized {
    val existed = items.exists(_.id == id)
    items --= items.filter(_.id == id)
    existed
  }
}
