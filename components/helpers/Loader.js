import dynamic from "next/dynamic";

export default function Loader({componentPath = ''}) {

    const path = componentPath; // example : "news/lists"
    console.log(path);
    const DynamicComponent = dynamic(() => import(''+path), 
    {
       ssr: false,
       loading: () => <p>l</p>,
    });

    return <DynamicComponent />;
}