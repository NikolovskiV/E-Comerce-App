import { getUserInfo } from "../localStorage";
import { parseRequestUrl } from "../utils";

const Header = {
    render: () => {
        const { value } = parseRequestUrl();
        const { name, isAdmin } = getUserInfo();
        return `
        <div class="brand">
                <a href="/#/"><strong>Home Shop</strong></a>
            </div>
           
            <div class="search">
                <form class="search-form"  id="search-form">
                    <input type="text" name="q" id="q" value="${value || ''}" /> 
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>        
            </div>
            
            <div>

                <strong>
                <a>Home</a>
            <a>Product</a>
            <a>About Us</a>
            <a>Contact Us</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/#/cart"><i id="icon" class='fas fa-cart-arrow-down'>&nbsp;</i>Cart</a>
                ${name
                ? `<a href="/#/profile">${name}</a>`
                : `<a href="/#/signin" class="signin__form">Sign-In</a>`
            }
                ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
                </strong>
            </div>`;
    },
    after_render: () => {
        document
            .getElementById('search-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                const searchKeyword = document.getElementById('q').value;
                document.location.hash = `/?q=${searchKeyword}`;
            })
    },
};

export default Header;


