import React from "react";
import css from "./Employees.module.scss";
import { FaPlus } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const Employees = () => {
  const navigate = useNavigate();

  return (
    <div className={`${css.wrapper} mx-auto`}>
      <div className={css.headingTop}>
        <h1>Workers Managment</h1>
        <div className={css.bottom}>
          <p>Employees</p>
          <button type="button" onClick={() => navigate("/addEmployee")}>
            <FaPlus /> <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Employees  */}
      <div className={`${css.employeesTable} w-full mx-auto my-5 h-14`}>
        {/* Table Header  */}
        <div className={css.tableHeader}>
          <div className={css.item}>Employee Name</div>
          <div className={css.item}>Employee Contact</div>
          <div className={css.item}>Role</div>
          <div className={css.item}></div>
        </div>

        {/* Table Body  */}
        <div className={css.tableBody}>
          <div className={css.tableRow}>
            <p>Zahid Yousaf</p>
            <p>(239) 555-0108</p>
            <p>worker</p>
            <div className={css.action}>
              <div className={`${css.stats} shadow-lg border cursor-pointer`}>
                <IoStatsChart />
              </div>
              <div className="w-[30px] h-[2px] rotate-90 bg-[#AFACAC]"></div>
              <div className={css.delete}>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className={css.tableRow}>
            <p>Faheem Malik</p>
            <p>(255) 876-0475</p>
            <p>manager</p>
            <div className={css.action}>
              <div className={`${css.stats} shadow-lg border cursor-pointer`}>
                <IoStatsChart />
              </div>
              <div className="w-[30px] h-[2px] rotate-90 bg-[#AFACAC]"></div>
              <div className={css.delete}>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className={css.tableRow}>
            <p>Muhammad Hateem</p>
            <p>(239) 555-0108</p>
            <p>worker</p>
            <div className={css.action}>
              <div className={`${css.stats} shadow-lg border cursor-pointer`}>
                <IoStatsChart />
              </div>
              <div className="w-[30px] h-[2px] rotate-90 bg-[#AFACAC]"></div>
              <div className={css.delete}>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className={css.tableRow}>
            <p>Arya Stark</p>
            <p>(229) 555-0108</p>
            <p>senior manager</p>
            <div className={css.action}>
              <div className={`${css.stats} shadow-lg border cursor-pointer`}>
                <IoStatsChart />
              </div>
              <div className="w-[30px] h-[2px] rotate-90 bg-[#AFACAC]"></div>
              <div className={css.delete}>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          <div className={css.tableRow}>
            <p>Arya Stark</p>
            <p>(229) 555-0108</p>
            <p>senior manager</p>
            <div className={css.action}>
              <div className={`${css.stats} shadow-lg border cursor-pointer`}>
                <IoStatsChart />
              </div>
              <div className="w-[30px] h-[2px] rotate-90 bg-[#AFACAC]"></div>
              <div className={css.delete}>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
