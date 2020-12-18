import React, { useEffect } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  useEffect(() => {
    const cookies = new Map(
      document.cookie
        .split("; ")
        .map((v) => v.split("=").map(decodeURIComponent))
    );

    const id = cookies.get("id");
    if (!id) {
      history.push("/");
    }
  }, []);

  return (
    <div className="Header">
      <div className="heading">daily expenses tracker</div>
    </div>
  );
}

export default Header;
