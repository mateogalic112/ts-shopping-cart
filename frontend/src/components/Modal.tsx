import { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SiteModal: FC<ModalProps> = ({ setShow, show }) => {
  const navigate = useNavigate()

  const handleClose = () => {
    setShow(false)
    navigate('/')
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, your order is completed!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SiteModal
