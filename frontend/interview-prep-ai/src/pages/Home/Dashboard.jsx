import moment from "moment"; // Make sure you import moment
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/Cards/SummaryCard'; // Ensure SummaryCard is imported
import DeleteAlertContent from '../../components/DeleteAlertContent';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { CARD_BG } from "../../utils/data";
import CreateSessionForm from "./CreateSessionForm";




const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("Fetched sessions:", response.data);
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };


  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
   <div className="w-full px-9 pt-4 pb-4">
   <div className="pt-1 pb-6">
  {sessions.length === 0 ? (
    <div className="flex flex-col items-center justify-center text-center h-[60vh]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Welcome to Your Dashboard
      </h2>
      <p className="text-gray-500 mb-6">
        You haven’t created any sessions yet.
      </p>
      <button
        onClick={() => setOpenCreateModal(true)}
        className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-900 transition cursor-pointer"
      >
        <LuPlus className="text-white" />
        Create Your First Session
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7">
      {sessions.map((data, index) => (
        <SummaryCard
          key={data?._id}
          colors={CARD_BG[index % CARD_BG.length]}
          role={data?.role || ""}
          topicsToFocus={data?.topicsToFocus || ""}
          experience={data?.experience || "-"}
          questions={data?.questions?.length || "-"}
          description={data?.description || ""}
          lastUpdated={
            data?.updatedAt
              ? moment(data.updatedAt).format("Do MMM YYYY")
              : ""
          }
          onSelect={() => navigate(`/interview-prep/${data?._id}`)}
          onDelete={() => setOpenDeleteAlert({ open: true, data })}
        />
      ))}
    </div>
  )}
</div>


{sessions.length > 0 && (
  <button
    className="h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
    onClick={() => setOpenCreateModal(true)}
  >
    <LuPlus className="text-2xl text-white" />
    Add New
  </button>
)}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >

        <CreateSessionForm />

      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null })
        }}
        title="Delete Alert"
      >
        <div className='min-w-[300px] max-w-[90vw] p-4'>
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
