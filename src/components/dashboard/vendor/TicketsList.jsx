"use client";

import React, { useMemo, useState } from "react";
import VendorAddedTicketCard from "@/components/dashboard/vendor/VendorAddedTicketCard";
import { Chip } from "@heroui/react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Filter,
// } from "@gravity-ui/icons";

const ITEMS_PER_PAGE = 6;

const TicketsList = ({ tickets = [] }) => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Status Filter Options
    const filters = [
        {
            label: "All",
            value: "all",
            count: tickets.length,
        },
        {
            label: "Approved",
            value: "approved",
            count: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === "approved"
            ).length,
        },
        {
            label: "Pending",
            value: "pending",
            count: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === "pending"
            ).length,
        },
        {
            label: "Rejected",
            value: "rejected",
            count: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === "rejected"
            ).length,
        },
    ];

    // Status Color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "success";
            case "rejected":
                return "danger";
            default:
                return "warning";
        }
    };

    // Filter Tickets
    const filteredTickets = useMemo(() => {
        if (activeFilter === "all") {
            return tickets;
        }

        return tickets.filter(
            (ticket) =>
                ticket.status?.toLowerCase() === activeFilter
        );
    }, [tickets, activeFilter]);

    // Pagination Calculations
    const totalPages = Math.ceil(
        filteredTickets.length / ITEMS_PER_PAGE
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const currentTickets = filteredTickets.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Page Numbers (Maximum 5)
    const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const endPage = Math.min(totalPages, startPage + 4);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    // Change Filter
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    // Change Page
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const getEmptyMessage = () => {
        if (activeFilter === "all") {
            return {
                title: "No Tickets Found",
                description: "You haven't added any tickets yet.",
            };
        }

        return {
            title: `No ${activeFilter} Tickets`,
            description: `There are no ${activeFilter} tickets available.`,
        };
    };

    const emptyMessage = getEmptyMessage();

    return (
        <div className="space-y-2">

            {/* Status Filter */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#1F2937]">

                <div className="mb-4 flex items-center gap-2">
                    {/* <Filter className="size-4 text-gray-500" /> */}

                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                        Filter by Status
                    </h3>
                </div>

                <div className="flex justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter.value;

                            return (
                                <button
                                    key={filter.value}
                                    onClick={() => handleFilterChange(filter.value)}
                                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                        : "border-gray-200 bg-gray-50 text-black hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500"
                                        }`}
                                >
                                    {filter.label}

                                    <span
                                        className={`rounded-md px-2 py-0.5 text-xs ${isActive
                                            ? "bg-white/20 text-white"
                                            : "text-black"
                                            }`}
                                    >
                                        {filter.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <Chip color="primary" variant="flat">
                        {filteredTickets.length} Tickets
                    </Chip>

                </div>
            </div>

            {/* Tickets Grid */}
            {currentTickets.length === 0 ? (

                <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center dark:border-gray-700 dark:bg-[#1F2937]/50">

                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-500/10">
                        <Ticket className="text-blue-500" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {emptyMessage.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {emptyMessage.description}
                    </p>

                    {activeFilter !== "all" && (
                        <button
                            onClick={() => handleFilterChange("all")}
                            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            View All Tickets
                        </button>
                    )}

                </div>

            ) : (

                <>
                    <div className="grid grid-cols-1 gap-6">

                        {currentTickets.map((ticket) => (
                            <VendorAddedTicketCard
                                key={ticket._id}
                                ticket={ticket}
                                color={getStatusColor(ticket.status)}
                                
                            />
                        ))}

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#1F2937] sm:flex-row">

                            {/* Showing Information */}
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {startIndex + 1}-
                                    {Math.min(
                                        startIndex + ITEMS_PER_PAGE,
                                        filteredTickets.length
                                    )}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {filteredTickets.length}
                                </span>{" "}
                                tickets
                            </p>

                            {/* Pagination Controls */}
                            <div className="flex flex-wrap items-center justify-center gap-2">

                                {/* Previous */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>

                                {/* Page Numbers */}
                                {pageNumbers.map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        aria-current={
                                            currentPage === page ? "page" : undefined
                                        }
                                        className={`size-9 rounded-lg text-sm font-semibold transition ${currentPage === page
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                            : "border border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>

                            </div>

                        </div>
                    )}

                </>
            )}

        </div>
    );
};

export default TicketsList;
