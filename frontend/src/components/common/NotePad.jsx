import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

// API calls
const API_URL = "http://localhost:5000/api/note/";

const fetchNotes = async () => {
  const response = await fetch(API_URL + "getNote", {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching notes");
  return response.json();
};

const addNote = async (newNote) => {
  const response = await fetch("/api/note/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newNote),
  });
  if (!response.ok) throw new Error("Error adding note");
  return response.json();
};

const deleteNote = async (id) => {
  const response = await fetch(`/api/note/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error deleting note");
  return id;
};

const NotePad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState(""); 
  const [noteContent, setNoteContent] = useState(""); 

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const queryParams = new URLSearchParams(location.search);
    const notesOpenParam = queryParams.get("notesOpen");
    setIsOpen(notesOpenParam === "true");
  }, [location.search]);

  useEffect(() => {
    if (isOpen) {
      navigate({ search: "?notesOpen=true" });
    } else {
      navigate({ search: "" });
    }
  }, [isOpen, navigate]);

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    enabled: isOpen,
  });

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNoteTitle("");
      setNoteContent("");
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });


  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };


  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };


  const handleCreateNote = () => {
    if (noteTitle && noteContent) {
      createNoteMutation.mutate({ title: noteTitle, content: noteContent });
    }
  };


  const handleDeleteNote = (id) => {
    deleteNoteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching notes: {error.message}</div>;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 ${isOpen ? "bg-orange-500" : "bg-blue-500"} text-white p-3 rounded-full shadow-lg z-50 bottom-20 top-auto md:bottom-0`}
      >
        {isOpen ? "Close Note" : "Open Note"}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-4 w-64 h-1/2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Note</p>
            <button
              onClick={handleCreateNote}
              className="bg-green-500 text-white px-2 py-1 rounded-sm mr-2 w-20"
              disabled={!noteTitle || !noteContent}
            >
              Create
            </button>
          </div>

          <input
            type="text"
            value={noteTitle}
            onChange={handleTitleChange}
            placeholder="Title"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />

          <textarea
            value={noteContent}
            onChange={handleNoteChange}
            placeholder="Write your note here..."
            className="w-full h-full border-0 p-2 resize-none outline-none mt-2"
          />
          <div className="notes-list mt-2 h-1/2 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note._id}
                className="note-item bg-green-500 p-2 mb-2 rounded-md h-20 overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-black text-start">
                    {note.title}
                  </h3>
                  <MdDeleteOutline
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteNote(note._id)}
                  />
                </div>
                <p className="text-gray-700 text-start">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NotePad;
