/*
Copyright (c) 2021 - present / Neuralmagic, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { ReactComponent as Icon } from "./img/icon.svg";
import PropTypes from "prop-types";
import moment from "moment";

import { setPerfModalOpen } from "../../../store";

import makeStyles from "./menu-profile-perf-styles";
import { createProjectPerfPath } from "../../paths";
import ProjectSideNavMenu from "../menu";
import ProjectSideNavSubMenuTitle from "../sub-menu-title";
import ProjectSideNavSubMenuItem from "../sub-menu-item";
import LoaderLayout from "../../../components/loader-layout";

const useStyles = makeStyles();

function ProjectSideNavMenuProfilePerf({
  selectedState,
  projectId,
  action,
  profileId,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selected = action === "perf";

  const dateUtcToLocal = (date) => moment.utc(date).local();

  return (
    <ProjectSideNavMenu
      titlePath={createProjectPerfPath(projectId, profileId)}
      title="Performance Profiles"
      selected={selected}
      collapsible={true}
    >
      <Icon />
      <LoaderLayout
        status={selectedState.status}
        error={selectedState.error}
        errorTitle="Error loading performance profiles"
        loaderSize={28}
        rootClass={classes.loaderLayout}
      >
        <ProjectSideNavSubMenuTitle
          onClick={() => dispatch(setPerfModalOpen(true))}
          title="Profile"
          showAdd={true}
        />
        <Divider light className={classes.divider} />
        {selectedState.val.map((profile) => (
          <div key={profile.profile_id}>
            <ProjectSideNavSubMenuItem
              key={profile.profile_id}
              path={createProjectPerfPath(projectId, profile.profile_id)}
              selected={profileId === profile.profile_id}
              value={
                profile.name ||
                dateUtcToLocal(profile.created).format("MM/DD/YYYY h:mma")
              }
              extraValue={
                profile.name ? `(${dateUtcToLocal(profile.created).fromNow()})` : ""
              }
            />
          </div>
        ))}
        <ProjectSideNavSubMenuItem
          path={createProjectPerfPath(projectId, null)}
          selected={!profileId}
          value="FLOPS"
        />
      </LoaderLayout>
    </ProjectSideNavMenu>
  );
}

ProjectSideNavMenuProfilePerf.propTypes = {
  selectedState: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  action: PropTypes.string,
  profileId: PropTypes.string,
};

export default ProjectSideNavMenuProfilePerf;
