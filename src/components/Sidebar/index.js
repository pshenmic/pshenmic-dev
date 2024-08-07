import './Sidebar.scss'

function Sidebar ({ children, ...props }) {
  return (
    <div className={'Sidebar'} {...props}>
      {children}
    </div>
  )
}

export default Sidebar
