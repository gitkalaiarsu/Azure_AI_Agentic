/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { formatText, renderTextWithLinks } from "chat/utility/constant";
import React, { useEffect, useRef, useState } from "react";
import StepArrow from "../../../assets/step-arrow.svg";

const CPAPScrollspy = ({ message }) => {
  const [activeSection, setActiveSection] = useState(null);
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);

  const orderedPanels = React.useMemo(() => {
    const panels = ["reasoning"];
    if (message?.toolCalling && message.toolCalling !== "null") {
      panels.push("tool_usage");
    }
    if (message?.actionPlan && message.actionPlan !== "null") {
      panels.push("action_plan");
    }
    return panels;
  }, [message]);
  

  useEffect(() => {  
    sectionRefs.current = orderedPanels.map(() => React.createRef());
  }, [orderedPanels]);

  useEffect(() => {
    let scrollTimer = null;

    const handleScroll = () => {
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        if (!contentRef.current) return;

        const scrollPosition = contentRef.current.scrollTop;
        const containerHeight = contentRef.current.clientHeight;

        const sectionPositions = sectionRefs.current.map((ref, index) => {
          if (!ref.current)
            return { id: `list-item-${index}`, top: 0, height: 0 };
          return {
            id: `list-item-${index}`,
            top: ref.current.offsetTop,
            height: ref.current.offsetHeight,
          };
        });

        if (
          scrollPosition + containerHeight >=
          contentRef.current.scrollHeight - 20
        ) {
          setActiveSection(`list-item-${sectionPositions.length - 1}`);
        } else {
          let currentSection = null;
          let maxVisibleHeight = 0;

          for (const section of sectionPositions) {
            const sectionTop = section.top;
            const sectionBottom = sectionTop + section.height;
            const scrollBottom = scrollPosition + containerHeight;

            if (sectionBottom < scrollPosition) continue;
            if (sectionTop > scrollBottom) continue;

            const visibleTop = Math.max(scrollPosition, sectionTop);
            const visibleBottom = Math.min(scrollBottom, sectionBottom);
            const visibleHeight = visibleBottom - visibleTop;

            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              currentSection = section.id;
            }
          }

          if (currentSection) {
            setActiveSection(currentSection);
          } else if (sectionPositions.length > 0) {
            for (const section of sectionPositions) {
              if (
                section.top <= scrollPosition + containerHeight &&
                section.top + section.height >= scrollPosition
              ) {
                setActiveSection(section.id);
                break;
              }
            }
          }
        }
      }, 50);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  const scrollToSection = (e, itemId) => {
    e.preventDefault();
    setActiveSection(itemId);

    const index = parseInt(itemId.split("-").pop());
    const targetRef = sectionRefs.current[index];

    if (targetRef?.current && contentRef.current) {
      contentRef.current.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Render if there is at least one panel available
  if (!orderedPanels.length) {
    return <div>No content to display</div>;
  }

  return (
    <div className="chat-container-accordion">
      <div className="main-container container">
        <div className="row g-0 py-2">
          {/* Sidebar navigation */}
          <div className="col-md-4 sidebar border-0 scrollspy-sidebar">
            <div
              id="list-example"
              className="list-group sticky-top scrollspy-side-wrap"
            >
              {orderedPanels?.map((panel, index) => {
                const itemId = `list-item-${index}`;
                const isActive = activeSection === itemId;
                return (
                  <a
                    key={itemId}
                    className={`list-group-item list-group-item-action ${
                      isActive ? "active" : ""
                    }`}
                    href={`#${itemId}`}
                    onClick={(e) => scrollToSection(e, itemId)}
                  >
                    <div className="step-scrollspy">
                      <img
                        src={StepArrow}
                        alt="step arrow"
                        width={25}
                        height={25}
                      />
                      <span className="scrollsidebar-text">
                        {formatText(panel)}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div
            ref={contentRef}
            className="col-md-8 content-area overflow-auto position-relative scrollspy-content"
            tabIndex="0"
            style={{ height: "300px", overflowY: "auto" }}
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-offset="0"
          >
            {orderedPanels.map((panel, index) => {
              const itemId = `list-item-${index}`;
              return(
              <div
                key={itemId}
                id={`list-item-${index}`}
                className="thinking-section"
                ref={sectionRefs.current[index]}
              >
                <h4>{formatText(panel)}</h4>
                {panel === "reasoning" &&
                  renderTextWithLinks(message?.content, "agent")}
                {panel === "tool_usage" &&
                  renderTextWithLinks(message?.toolCalling, "agent")}
                {panel === "action_plan" &&
                  renderTextWithLinks(message?.actionPlan, "agent")}
              </div>
              )})}
          </div>
        </div>
      </div>
    </div>
  );
};

CPAPScrollspy.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    actionPlan: PropTypes.string,
    toolCalling: PropTypes.string,
    panel: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CPAPScrollspy;
