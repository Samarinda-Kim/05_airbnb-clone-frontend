import useHostOnlyPage from '../components/HostOnlyPage'
import HostOnlyPage from '../components/HostOnlyPage'
import ProtectedPage from '../components/ProtectedPage'

export default function UploadRoom() {
  useHostOnlyPage()
  return (
    <ProtectedPage>
      <h1>upload roommmmmmmm</h1>
    </ProtectedPage>
  )
}
