import Swal from 'sweetalert2'

export function SweetAlertSuccess(title: string, text?: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    confirmButtonColor: '#FACC15',
    timer: 1500,
  })
}

export function SweetAlertError(title: string, text: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonColor: '#FACC15',
    timer: 1500,
  })
}
