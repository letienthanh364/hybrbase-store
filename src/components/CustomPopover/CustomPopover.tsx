"use client";

import React, { useEffect, useRef, useState } from "react";

interface CustomPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  offset?: number;
  width?: string;
  closeOnClickOutside?: boolean;
}

export default function CustomPopover({
  trigger,
  content,
  position = "bottom",
  width = "w-64",
  closeOnClickOutside = true,
}: CustomPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Properly type the refs with HTMLDivElement
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Handle outside clicks
  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Add type assertion for event.target
      const target = event.target as Node;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside]);

  // Calculate position styles based on the specified position
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "bottom":
      default:
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    }
  };

  // Toggle popover
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full inline-block">
      {/* Trigger element */}
      <div ref={triggerRef} onClick={togglePopover} className="cursor-pointer">
        {trigger}
      </div>

      {/* Popover content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 ${getPositionStyles()} ${width} bg-white rounded-md shadow-lg border border-gray-200`}
        >
          <div className="p-2">{content}</div>
        </div>
      )}
    </div>
  );
}
