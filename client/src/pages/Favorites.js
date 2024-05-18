import CollectionCardSkeleton from "../components/skeletonLoadings/CollectionCardSkeleton";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import AuthContext from "../context/AuthProvider";
import { CollectionCard } from "../components/CollectionCard";
import { fetchCollections, addNewCollection } from "../api/fetch.js";
import warningNotify from "../utils/warningNotify";
import successNotify from "../utils/successNotify";

export default function Favorites() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    
    useEffect(() => {
        if (!auth?.accessToken) {
            navigate('/login')
        }
    }, [auth, navigate])

    const createCollection = useMutation({
        mutationFn: () => addNewCollection(name, description),
        onSuccess: (data) => {
            successNotify(data.data)
            document
                .getElementById("create_collection_modal")
                .close()
            refetchCollections()
        },
        onError: (error) => {
            warningNotify(error.response.data);
        }
    })

    const {
        data: collections,
        isLoading: isLoadingCollections,
        isSuccess: isSuccessCollections,
        refetch: refetchCollections
    } = useQuery({
        queryKey: ["fetch-collections"],
        queryFn: () => fetchCollections(),
        retry: false,
        refetchOnWindowFocus: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createCollection.mutate()
    }
    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <p className="text-3xl font-semibold">
                        Favorite Collections
                    </p>
                    <div className="my-6 text-center">
                        <button
                            className="btn w-full border p-4 rounded-md font-semibold border-black bg-white"
                            onClick={() =>
                                document
                                    .getElementById("create_collection_modal")
                                    .showModal()
                            }
                        >
                            <i class="fa-solid fa-plus mr-2"></i> Create new
                            collection
                        </button>
                        <dialog id="create_collection_modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg my-4">
                                    Create new collection
                                </h3>
                                <div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5 focus:ring-black focus:border-black"
                                            required
                                        />
                                    </div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="description"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            onChange={(e) => setDescription(e.target.value)}
                                            type="text"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-black focus:border-black"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={(e) => handleSubmit(e)}
                                        className="flex btn btn-outline btn-success justify-end">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-12">
                        {isLoadingCollections && (
                            <>
                                <CollectionCardSkeleton />
                                <CollectionCardSkeleton />
                                <CollectionCardSkeleton />
                            </>
                        )}

                        {   isSuccessCollections && 
                            collections.map((collection) => {
                                return <CollectionCard key={collection._id} collection={collection} refetchCollections={refetchCollections}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}