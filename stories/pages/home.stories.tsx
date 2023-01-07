import React from 'react'
import {Meta} from "@storybook/react";
import Home from "../../pages/index"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Pages/Home",
    component: Home,
} as Meta<typeof Home>

export const HomePage = () => <Home />
