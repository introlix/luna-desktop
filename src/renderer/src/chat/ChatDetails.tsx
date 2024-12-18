import { Sidebar } from '@renderer/components/Sidebar/Sidebar';
import React from 'react';

export const ChatDetails = () => {
    return (
        <>
            <div className="flex h-screen overflow-hidden bg-blue-50 dark:bg-gray-800">
                {/* Sidebar */}
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className={`overflow-y-auto`}>
                    Hello
                </div>
            </div>
        </>
    )
}
