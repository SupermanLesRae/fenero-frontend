"use client";
import { useEffect } from "react";

export default function IrishJobsWidget() {
  useEffect(() => {
    // Create the container for jobs
    const SRSContainer = document.createElement("div");
    SRSContainer.id = "SRSJobsList";
    const snippetContainer = document.getElementById("ij-snippet");
    if (snippetContainer) snippetContainer.appendChild(SRSContainer);

    const domain = "hub.irishjobs.ie";
    const companyId = "c08fb6e3-593e-4fce-8d8b-fe4e120e3a28";
    const page_size = 20;
    let currentPage = 1;
    const proto = "https";

    // Unique JSONP callback
    const callback = `_SRS_callback_${Math.random().toString(36).substring(2)}`;
    window[callback] = function (data) {
      const jobList = document.getElementById("SRSJobsList");
      if (!jobList) return;

      let html = "";
      data.jobs.forEach((j) => {
        html += `
          <div class="SRSJobCard">
            <a class="SRSJobTitle" href="${j.url}" target="_blank">${j.jobTitle}</a>
            <div class="SRSJobSummary">
              <p>${j.employmentType}</p>
              <p>${j.location}</p>
              <p>${j.renumeration}</p>
              <p>${j.modifiedDateTimeShortLabel}</p>
            </div>
            <div class="SRSJobDetails">${j.jobDescription}</div>
            <div class="SRSJobPosted">Posted ${j.publicationDateTimeLabel}</div>
            <div class="SRSJobButton">
              <a href="${j.url}" target="_blank">view & apply</a>
            </div>
          </div>
        `;
      });

      jobList.innerHTML = html;

      // Increment page if more jobs
      if (data.has_more) currentPage += 1;
    };

    // Load jobs via JSONP
    const loadJobs = () => {
      const scriptEl = document.createElement("script");
      scriptEl.src = `${proto}://${domain}/jobsnippet/${companyId}/getjobs.js?page_size=${page_size}&callback=${callback}&page=${currentPage}`;
      document.body.appendChild(scriptEl);
    };

    loadJobs();
  }, []);

  return <div id="ij-snippet"></div>;
}
