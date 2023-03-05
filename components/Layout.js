import Navbar from "./navbar/navbar";

export default function Layout({children}) {

    // Layout 컴포넌트에서 children prop을 사용하여 nested route 구현
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}