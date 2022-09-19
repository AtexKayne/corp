import Breadcrumbs from "../components/Breadcrumbs"

export default function MainLayout({children, className}) {
    return (
        <>
            <Breadcrumbs className={className}/>
            <div className={`${className} container`}>
                {children}
            </div>
        </>
    )
}