import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Spin } from "antd";
import SearchBar from "./components/searchBar";
import UserCardAnt from "./components/UserCardAnt";
import EditUserModal from "./components/EditUserModal";
import "antd/dist/reset.css";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSearch = (q) => {
    const query = q.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.company.name.toLowerCase().includes(query)
      )
    );
  };

  const handleUpdate = (updatedUser) => {
    const newUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(newUsers);
    setFiltered(newUsers);
    setEditingUser(null); // close modal
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: 20 }}>
        React Advanced Assignment
      </Header>
      <Content style={{ padding: 24 }}>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="centered">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {filtered.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
                <UserCardAnt user={user} onEdit={() => setEditingUser(user)} />
              </Col>
            ))}
          </Row>
        )}

        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleUpdate}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;
