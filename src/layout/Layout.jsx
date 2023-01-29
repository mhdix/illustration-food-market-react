import Navbar from "../component/Navigation/Navbar";

const Layout = ({ children  , className }) => {
    return (
        <>
            <main className={`container-c text-dark bg-dark ${className}`}>
                <Navbar />
                {children}
            </main>
        </>
    );
}

export default Layout;