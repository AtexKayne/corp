export default function MainLayout({children, className}) {
    return (
        <div className={`${className} container`}>
            {children}
        </div>
    )
}