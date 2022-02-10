import "../css/typeahead.css";

export const Typeahead = ({ users, lastUserRef }) => {
  return (
    <div className="typeahead">
      {users.map((user, id) => {
        if (users.length - 1 === id) {
          return (
            <a
              rel="noreferrer"
              ref={lastUserRef}
              target="_blank"
              href={user.html_url}
              className="user-info"
              key={id}
            >
              <img src={user.avatar_url} alt="user avatar" />
              <p>{user.login}</p>
            </a>
          );
        } else {
          return (
            <a
              rel="noreferrer"
              target="_blank"
              href={user.html_url}
              className="user-info"
              key={id}
            >
              <img src={user.avatar_url} alt="user avatar" />
              <p>{user.login}</p>
            </a>
          );
        }
      })}
    </div>
  );
};
