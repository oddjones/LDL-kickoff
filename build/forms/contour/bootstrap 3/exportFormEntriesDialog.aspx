<%@ Page Language="C#" MasterPageFile="../../masterpages/umbracoPage.Master" AutoEventWireup="true" CodeBehind="exportFormEntriesDialog.aspx.cs" Inherits="Umbraco.Forms.UI.Dialogs.exportFormEntriesDialog" %>
<%@ Import Namespace="Umbraco.Forms.Core" %>
<%@ Register Namespace="umbraco.uicontrols" Assembly="controls" TagPrefix="umb" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../../../umbraco_client/GenericProperty/genericproperty.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="css/dialogs.css" type="text/css" media="screen" />
    
    <style>

    #dialogcontainer
    {
        width: 570px;
    	height:380px;
    	overflow:auto;
    }
    </style>
    <% if (CompatibilityHelper.IsVersion7OrNewer)
       { %>
    <link rel="stylesheet" href="css/dialogsv7.css" type="text/css" media="screen" />
    <% } %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div id="dialogcontainer">
  
    
    
    
    <umb:UmbracoPanel ID="Panel1" runat="server" hasMenu="false" Text="Export Entries">
        
          <umb:Pane  ID="pane1" runat="server" Text="" >
        <umb:PropertyPanel ID="paneExportType" runat="server" Text="Export Type">
            <asp:DropDownList ID="dd_exportTypes" AutoPostBack="true" runat="server" />
        </umb:PropertyPanel>
          </umb:Pane>

       <umb:Pane  ID="paneAddSettings" runat="server" Text="" Visible="false">
           
           
           
            <umb:PropertyPanel runat="server" Text="Description">
                 <em><asp:Literal ID="lt_export_description" runat="server" /></em>
            </umb:PropertyPanel>
           
               
            <asp:PlaceHolder ID="ph_Settings" runat="server" />
           
            <umb:PropertyPanel  runat="server" Text="">
                 <asp:Button ID="bt_export" runat="server" Text="Export data" OnClick="Export" CssClass="btn btn-primary" />
               </umb:PropertyPanel>
        </umb:Pane>
      
      
        
         <div class="dialogcontrols">
        
                <a href="javascript:parent.CloseExportFormEntriesDialog();">Close</a>
         </div>
        
    </umb:UmbracoPanel>

    </div>
    </asp:Content>
