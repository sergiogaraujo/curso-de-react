function input (props) {
    return (
    <input  
    className="border border-slate-300 outline-state-400 px-4 py-2 rounded-md" 
   {...props}
            placeholder="Digite a descrição da tarefa"
    />
  );
}

export default input;