function Button(props) {
    return ( 
    <button {...props} className="bg-slate-400 text-left w-full text-white"> {props=.children}
        </button>
    );     
}

export default Button;