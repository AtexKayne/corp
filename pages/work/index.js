import Title from '../../components/Title'
import MainLayout from '../../layout/MainLayout'

export default function Work() {
    return (
        <MainLayout className='ui-light'>
            <div className='col'>
                <Title text='Work' hover='work'/>
            </div>
            <div className='col'>
            </div>
        </MainLayout>
    )
}