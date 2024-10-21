﻿using API.Models;
using DeclarativePM.Lib.Utils;
using Microsoft.AspNetCore.Mvc;
using ProcessM.NET.ConformanceChecking.Alignments;
using ProcessM.NET.Model.DataAnalysis;
using ProcessM.NET.Model.SynchronousProductNet;

namespace API.Controllers;

[ApiController]
[Route("/model/conformance")]
public class ConformanceController : ControllerBase
{
    [HttpPost]
    [Route("declare")]
    public ActionResult<TraceEvaluationAPI> DeclareConformance(ConformanceModelAPI conformanceModel)
    {
        var declareModel = conformanceModel.DeclareModel.ConvertToDeclareModel();

        var evaluator = new ConformanceEvaluator();
        var traceEvaluation = evaluator.EvaluateTrace(declareModel, conformanceModel.Trace);

        var temp = traceEvaluation.TemplateEvaluations.Where(t => t.ConstraintEvaluations.Count > 0).ToList();
        traceEvaluation.TemplateEvaluations.Clear();
        traceEvaluation.TemplateEvaluations.AddRange(temp);

        var result = Conformance.Conformance.PrepareConformanceEvaluationResult(traceEvaluation);

        return Ok(result);
    }

    [HttpPost]
    [Route("alignment")]
    public ActionResult<List<STransition>> AlignmentConformance(AlignmentConformanceAPI alignmentConformance)
    {
        var petriNetApi = alignmentConformance.PetriNet;
        var traceApi = alignmentConformance.Trace;

        if (petriNetApi == null || traceApi == null)
        {
            return BadRequest("You have to pass a petri net and a trace");
        }

        if (petriNetApi.Transitions == null || petriNetApi.Places == null)
        {
            return BadRequest("Petri net must contain places and transitions");
        }

        var petriNet = alignmentConformance.PetriNet?.ConvertToPetriNet();

        var workflowTrace = new WorkflowTrace("Case");

        var activities = traceApi.Select((e) => e.Activity);
        workflowTrace.AddActivities(activities);

        List<STransition> result = AlignmentUtils.OptimalAlignmentOnTrace(workflowTrace, petriNet);

        return Ok(result);
    }

    [HttpPost]
    [Route("traces")]
    public ActionResult<List<TraceDTO>> GetEventLog(ImportedEventLogAPI importedEventLog)
    {
        var traces = importedEventLog
            .BuildEventLog()
            .GetAllTraces()
            .Select(x => new TraceDTO(x))
            .ToList();

        return Ok(traces);
    }
}