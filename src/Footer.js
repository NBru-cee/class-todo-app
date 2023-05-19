const Footer = ({ length }) => {
    const today = new Date();
    return (
        <footer>
            <p style={{ textAlign: "center" }}>
                {length} List {length === 1 ? "Item" : "Items"}
            </p>
            <p>Copyright &copy; {today.getFullYear()} Bruce Ink</p>
        </footer>
    );
};

export default Footer;
