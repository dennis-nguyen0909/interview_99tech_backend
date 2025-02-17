import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";

export default function Header() {
    const userDetail = useSelector(state=>state.user)
    const logout = ()=>{
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        window.location.reload()
    }
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interview 99tech backend</h1>
        <form className="flex flex-row items-center gap-2">
            <div>Hi, {userDetail?.fullName}</div>
          <Button  onClick={()=>logout()} className="flex items-center hover:bg-[#ccc] rounded-full">
            <span>Logout</span>
            <ArrowRightOutlined className="mr-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}

