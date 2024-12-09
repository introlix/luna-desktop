import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { BsChat } from "react-icons/bs";
import { FiGrid, FiSettings } from "react-icons/fi";
import { Theme } from "../Theme/Theme";

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

  const bottomMenuItems = [
    {
      icon: <FiSettings />,
      title: 'Settings'
    }
  ]

  return (
    <div>
      <Layout>
        <Sider
          width={50}
          className="bg-blue-100 dark:bg-gray-900 h-screen border-r border-gray-300 dark:border-gray-700 sticky top-0"
        >
          <div className="flex flex-col h-full justify-between">
            {/* Top Section */}
            <div>
              {topMenuItems.map((item, key) => (
                <div
                  key={key}
                  className="flex justify-center items-center mt-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  title={item.title} // Tooltip on hover
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div>
              <div className="dark_mode_light_mode text-2xl flex justify-center items-center mb-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500">
                <Theme />
              </div>
              {bottomMenuItems.map((item, key) => (
                <div
                  key={key}
                  className="flex justify-center items-center mb-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  title={item.title} // Tooltip on hover
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </Sider>
      </Layout>
    </div>
  )
}
