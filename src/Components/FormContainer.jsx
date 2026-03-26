
const FormContainer = ({title, handleSubmit, children}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
        <h1>{title}</h1>
        {children}
    </form>
)
};

export { FormContainer }