// old version but i need it yet
import dynamic from "next/dynamic";

export default function Loader({componentPath = ''}) {

    const DynamicComponent = dynamic(() => import(''+componentPath), 
    {
       ssr: false,
       loading: () => <p>l</p>,
    });

    return <DynamicComponent />;
}