"use client";

import { useState } from "react";
import RequestedBookingRow from "./RequestedBookingRow";

const BookingPagination = ({ bookings }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = bookings.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full min-w-212.5 text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Ticket</th>
                            <th className="px-6 py-4">Quantity</th>
                            <th className="px-6 py-4">Total Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {currentBookings.length > 0 ? (
                            currentBookings.map((booking) => (
                                <RequestedBookingRow
                                    key={booking._id}
                                    booking={booking}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center">
                                    <p className="text-2xl font-semibold text-gray-700">
                                        No booking requests found
                                    </p>
                                    <p className="mt-1 text-sm text-gray-400">
                                        New booking requests will appear here.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-800">
                            {startIndex + 1}
                        </span>
                        {" - "}
                        <span className="font-semibold text-gray-800">
                            {Math.min(startIndex + itemsPerPage, bookings.length)}
                        </span>
                        {" of "}
                        <span className="font-semibold text-gray-800">
                            {bookings.length}
                        </span>
                        {" bookings"}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${currentPage === page
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingPagination;
