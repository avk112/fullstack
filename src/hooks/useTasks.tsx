import React, { useState } from "react";
import axios from "axios";

interface IUseTasksProps {
  setTodoList?: Function;
  taskId?: number | null;
}

const useTasks = ({
  taskId = null,
  setTodoList = () => {},
}: IUseTasksProps) => {
  const [input, setInput] = useState<string>("");
  const token = localStorage.getItem("token");

  const getAllTodos = () => {
    const options = {
      method: "GET",
      url: "http://localhost:3000/api/task/",
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    axios
      .request(options)
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = async () => {
    if (input) {
      const options = {
        method: "POST",
        url: "http://localhost:3000/api/task/",
        data: {
          text: input,
          parent_id: taskId,
        },
        headers: {
          Authorization: "Bearer " + token || "",
        },
      };

      return axios
        .request(options)
        .then((res) => {
          if (res.data.message === "success") {
            getAllTodos();
            // setIsVisibleInput(false);
            setInput("");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const updateTask = async () => {
    const options = {
      method: "PATCH",
      url: `http://localhost:3000/api/task/${taskId}`,
      data: {
        text: input,
      },
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    return axios
      .request(options)
      .then((res) => {
        getAllTodos();
        // handleTextBlock(false);
      })
      .catch((error) => console.log(error));
  };

  const changeParentTask = async (future_parent_id: number | null) => {
    const options = {
      method: "PATCH",
      url: `http://localhost:3000/api/task/${taskId}/change-parent`,
      data: {
        future_parent_id: future_parent_id,
      },
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    return axios
      .request(options)
      .then((res) => {
        getAllTodos();
        // handleTextBlock(false);
      })
      .catch((error) => console.log(error));
  };

  const changeOrderTask = async (isUp: boolean = true) => {
    const options = {
      method: "PATCH",
      url: `http://localhost:3000/api/task/${taskId}/change-order`,
      data: {
        up_in_list: isUp,
      },
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    return axios
      .request(options)
      .then((res) => {
        getAllTodos();
        // handleTextBlock(false);
      })
      .catch((error) => console.log(error));
  };

  const deleteTask = () => {
    const options = {
      method: "DELETE",
      url: `http://localhost:3000/api/task/${taskId}`,
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    axios
      .request(options)
      .then((res) => {
        getAllTodos();
      })
      .catch((error) => console.log(error));
  };

  return {
    input,
    setInput,
    getAllTodos,
    addTask,
    updateTask,
    deleteTask,
    changeParentTask,
    changeOrderTask,
  };
};

export default useTasks;
