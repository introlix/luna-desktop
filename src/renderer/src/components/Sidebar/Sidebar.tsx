import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { BsChat } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";

export const Sidebar = () => {
  const topMenuItems = [
    {
      icon: <BsChat />,
      title: 'Chat'
    },
    {
      icon: <FiGrid />,
      title: 'Explore'
    }
  ];

  return (
    <div>
      <Layout>
        <Sider
          width={50}
          className="bg-blue-100 dark:bg-gray-900 h-screen flex flex-col items-center py-4"
        >
          {topMenuItems.map((item, key) => (
            <div
              key={key}
              className="bg-transparent flex justify-center items-center mb-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500"
              title={item.title} // Tooltip on hover
            >
              <div className="text-xl">{item.icon}</div>
            </div>
          ))}
        </Sider>
      </Layout>
    </div>
  )
}
