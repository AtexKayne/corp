export default function MainLayout({children, className='ui-light'}) {
    return (
        <div className={`${className} container`}>
            {children}
        </div>
    )
}