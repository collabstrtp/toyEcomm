import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  PlusOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  UserOutlined,
  FlagOutlined,
  ShoppingCartOutlined,
  FormOutlined,
  FundOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Sidebar = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [blogsExpanded, setBlogsExpanded] = useState(false);
  const [bannersExpanded, setBannersExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (!isDesktopOrLaptop) {
      setIsSidebarOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`py-2 flex flex-col gap-x-1 gap-y-5 w-full bg-black sm:gap-x-4 lg:max-w-[250px] ${
        isDesktopOrLaptop ? "flex-shrink-0" : ""
      } lg:flex-col lg:pt-8 lg:max-w-60 lg:h-[screen] lg:justify-start lg:pl-6 scrollable-sidebar`}
    >
      {!isDesktopOrLaptop && (
        <button
          onClick={toggleSidebar}
          className="p-3 text-white flex cursor-pointer"
        >
          {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      )}

      <div
        className={`p-3 flex medium-16 ${
          !isDesktopOrLaptop && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Link
          to={""}
          onClick={closeSidebar}
          className={`font-anta mx-2 flex items-center gap-x-2 ${
            isActive("/admin")
              ? "border-b-2 border-orange-500 text-orange-500"
              : "border-b-black hover:border-b-orange-500 text-white"
          }`}
        >
          <HomeOutlined />
          Home
        </Link>
      </div>

      <div
        className={`p-3 flex medium-16 ${
          !isDesktopOrLaptop && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Link
          to={"userlist"}
          onClick={closeSidebar}
          className={`font-anta mx-2 flex items-center gap-x-2 ${
            isActive("/admin/userlist")
              ? "border-b-2 border-orange-500 text-orange-500"
              : "border-b-black hover:border-b-orange-500 text-white"
          }`}
        >
          <UserOutlined />
          Users
        </Link>
      </div>

      <Accordion
        onChange={(event, expanded) => setProductsExpanded(expanded)}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: productsExpanded ? "#f97316" : "white",
                "&:hover": {
                  color: "#f97316",
                },
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              color: productsExpanded ? "#f97316" : "white",
              "&:hover": {
                color: "#f97316",
              },
              fontFamily: "anta",
            }}
          >
            <span className="flex justify-center items-center font-anta gap-x-2">
              <ShoppingCartOutlined /> Products
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <div className="flex flex-col gap-y-4">
              <div>
                <Link
                  to={"addproduct"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/addproduct")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <PlusOutlined />
                  Add Products
                </Link>
              </div>
              <div>
                <Link
                  to={"productlist"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/productlist")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <UnorderedListOutlined />
                  Products List
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={(event, expanded) => setCategoriesExpanded(expanded)}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: categoriesExpanded ? "#f97316" : "white",
                "&:hover": {
                  color: "#f97316",
                },
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              color: categoriesExpanded ? "#f97316" : "white",
              "&:hover": {
                color: "#f97316",
              },
              fontFamily: "anta",
            }}
          >
            <span className="flex justify-center items-center font-anta gap-x-2">
              <ShoppingCartOutlined /> Categories
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <div className="flex flex-col gap-y-4">
              <div>
                <Link
                  to={"addcategory"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/addcategory")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <PlusOutlined />
                  Add Category
                </Link>
              </div>
              <div>
                <Link
                  to={"allcategories"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/allcategories")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <UnorderedListOutlined />
                  Category List
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={(event, expanded) => setBlogsExpanded(expanded)}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: blogsExpanded ? "#f97316" : "white",
                "&:hover": {
                  color: "#f97316",
                },
              }}
            />
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            sx={{
              color: blogsExpanded ? "#f97316" : "white",
              "&:hover": {
                color: "#f97316",
              },
              fontFamily: "anta",
            }}
          >
            <span className="flex justify-center items-center font-anta gap-x-2">
              <FormOutlined />
              Blogs
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <div className="flex flex-col gap-y-4">
              <div>
                <Link
                  to={"addblog"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/addblog")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <PlusOutlined />
                  Create Blog
                </Link>
              </div>

              <div>
                <Link
                  to={"allblogs"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 gap-y-6 ${
                    isActive("/admin/allblogs")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <UnorderedListOutlined />
                  All Blogs
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={(event, expanded) => setBannersExpanded(expanded)}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: bannersExpanded ? "#f97316" : "white",
                "&:hover": {
                  color: "#f97316",
                },
              }}
            />
          }
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography
            sx={{
              color: bannersExpanded ? "#f97316" : "white",
              "&:hover": {
                color: "#f97316",
              },
              fontFamily: "anta",
            }}
          >
            <span className="flex justify-center items-center font-anta gap-x-2">
              <FundOutlined /> Banners
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <div className="flex flex-col gap-y-4">
              <div>
                <Link
                  to={"bannersection"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 ${
                    isActive("/admin/bannersection")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <FlagOutlined />
                  Upload Banner
                </Link>
              </div>
              <div>
                <Link
                  to={"allbanners"}
                  onClick={closeSidebar}
                  className={`font-anta flex justify-center items-center gap-x-2 ${
                    isActive("/admin/allbanners")
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "border-b-black hover:border-b-orange-500 text-white"
                  }`}
                >
                  <UnorderedListOutlined />
                  All Banners
                </Link>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <div
        className={`p-3 flex medium-16 ${
          !isDesktopOrLaptop && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Link
          to={"orders"}
          onClick={closeSidebar}
          className={`font-anta mx-2 flex items-center gap-x-2 ${
            isActive("/admin/orders")
              ? "border-b-2 border-orange-500 text-orange-500"
              : "border-b-black hover:border-b-orange-500 text-white"
          }`}
        >
          <InboxOutlined />
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
