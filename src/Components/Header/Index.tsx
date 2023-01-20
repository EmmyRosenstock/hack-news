import './style.css';

export const Header = ({title = ''}: {title: string}) => {

  return (
    <header className="header">
      <h1>{title.toUpperCase()}</h1>
    </header>
  );

};