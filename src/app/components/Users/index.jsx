import React, { useState, useEffect } from "react";
import { fetchFilteredUsers, fetchUsers } from "../../redux/actions/user";
import {
  Title,
  Container,
  MainContainer,
  SearchContainer,
  Rectangle,
  Search
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import ListUser from "../ListUser";
import { setUserAsAdmin, removeAdmin } from "../../redux/actions/user";

export default function UsersComponent() {
  const [input, setInput] = useState("");
  const users = useSelector(state => state.user.users);
  const filteredUsers = useSelector(state => state.user.filteredUsers);
  const dispatch = useDispatch();

  const handleSearch = () => {
    setInput(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(fetchFilteredUsers(input));
  };

  const handleClick = user => {
    user.isAdmin
      ? dispatch(removeAdmin(user, input))
      : dispatch(setUserAsAdmin(user, input));
  };

  useEffect(() => {
    filteredUsers.length
      ? dispatch(fetchFilteredUsers(input))
      : dispatch(fetchUsers());
  }, []);

  return (
    <MainContainer>
      <SearchContainer>
        <form onSubmit={handleSubmit}>
          <Rectangle>
            <Search
              onChange={e => handleSearch(e)}
              placeholder="Buscar usuarios"
            />
          </Rectangle>
        </form>
      </SearchContainer>
      <Container>
        {filteredUsers.length ? (
          <>
            <Title>USUARIOS ({filteredUsers.length})</Title>
            {filteredUsers.map(user => (
              <ListUser key={user.id} user={user} handleClick={handleClick} />
            ))}
          </>
        ) : (
          <>
            <Title>USUARIOS ({users.length})</Title>
            {users.map(user => (
              <ListUser key={user.id} user={user} handleClick={handleClick} />
            ))}
          </>
        )}
      </Container>
    </MainContainer>
  );
}
