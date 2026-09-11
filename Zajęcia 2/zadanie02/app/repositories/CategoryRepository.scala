package repositories

import javax.inject._
import java.util.concurrent.atomic.AtomicLong
import scala.collection.mutable
import models.Category

@Singleton
class CategoryRepository {

  private val idGenerator = new AtomicLong(1L)

  private val categories: mutable.ListBuffer[Category] = mutable.ListBuffer(
    Category(
      idGenerator.getAndIncrement(),
      "Elektronika",
      "Sprzęt elektroniczny"
    ),
    Category(
      idGenerator.getAndIncrement(),
      "AGD",
      "Sprzęt gospodarstwa domowego"
    )
  )

  def getAll: List[Category] = synchronized(categories.toList)

  def getById(id: Long): Option[Category] =
    synchronized(categories.find(_.id == id))

  def add(name: String, description: String): Category = synchronized {
    val category = Category(idGenerator.getAndIncrement(), name, description)
    categories += category
    category
  }

  def update(id: Long, name: String, description: String): Option[Category] =
    synchronized {
      getById(id).map { existing =>
        val updated = existing.copy(name = name, description = description)
        val index = categories.indexWhere(_.id == id)
        categories.update(index, updated)
        updated
      }
    }

  def delete(id: Long): Boolean = synchronized {
    val existed = categories.exists(_.id == id)
    categories --= categories.filter(_.id == id)
    existed
  }
}
