import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { BsChat } from "react-icons/bs";

export const Sidebar = () => {
  return (
    <div>
      <Layout>
        <Sider>
          <Menu>
            <Menu.Item key={1} icon={<BsChat />} />
          </Menu>
        </Sider>
      </Layout>
    </div>
  )
}
