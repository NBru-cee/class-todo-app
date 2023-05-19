const Header = ({ title }) => {
    return (
        <header>
            <h2>{title}</h2>
        </header>
    );
};
Header.defaultProps = {
    title: "Default Header",
};
export default Header;
