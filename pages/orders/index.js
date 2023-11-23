import { orders } from '../../components/helpers/constants'
import Orders from '../../components/orders/Orders'

export default function OrdersPage({ detail }) {
    return <Orders detail={detail} />
}

export async function getServerSideProps(context) {
    let resp, json

    json = orders
    // try {
    //   resp = await fetch(`${process.env.API_URL}/team/${context.query.name}/?lang=ru`)
    //   json = await resp.json()
    // } catch (error) {
    //   json = persone
    // }

    return {
        props: {
            detail: json,
        }
    }
}