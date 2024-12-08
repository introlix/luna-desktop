import { Layout, List } from "antd";
import Sider from "antd/es/layout/Sider";


export const History = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <>
            <Layout>
  <Sider
    width={250}
    className="bg-blue-100 dark:bg-gray-900 h-screen flex flex-col"
  >
    {/* Sidebar Header */}
    <div className="sidebar-content m-4">
      <h2 className="text-lg font-sans font-semibold cursor-default dark:text-white text-gray-800">
        History
      </h2>
      <div className="bg-gray-400 w-full h-[1px] mt-3"></div>
    </div>

    {/* Scrollable List */}
    <div className="overflow-y-auto flex-1 px-4" style={{ maxHeight: "calc(100vh - 100px)" }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition duration-200">
            <List.Item.Meta
              title={
                <span className="dark:text-white text-gray-900 font-medium px-2">
                  {item.title}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  </Sider>
</Layout>

        </>
    )
}
