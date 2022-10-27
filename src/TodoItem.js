import Modal from "./Modal"
import './taskItem.css'

function TodoItem({onClose, open, title, todoItem}) {

  return (
    <Modal modalLable='Todo Item' onClose={onClose} open={open}>
      <div className='todoItem'>
        <h2>{title}</h2>
        <p>{todoItem}</p>
      </div>
    </Modal>
  )
}

export default TodoItem;
